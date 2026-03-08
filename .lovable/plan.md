

## Diagnostic

Le probleme est une **condition de course** (race condition) dans `useAdmin`. Voici ce qui se passe :

1. `useAuth` demarre avec `user: null, loading: true`
2. `useAdmin` voit `user === null` et execute immediatement `setIsAdmin(false)` + `setLoading(false)` (ligne 17-19)
3. La page `/admin` voit `loading: false` et `isAdmin: false` --> redirige vers `/`
4. Ensuite seulement, `useAuth` termine et fournit le `user`, mais il est trop tard

Le hook `useAdmin` ne tient pas compte du `loading` de `useAuth`. Quand l'auth est encore en cours de chargement, il conclut prematurement que l'utilisateur n'est pas admin.

## Correction

Modifier `useAdmin.ts` pour inclure le `loading` de `useAuth` :

- Importer `loading` depuis `useAuth()` (renomme en `authLoading`)
- Tant que `authLoading` est `true`, garder `loading: true` dans `useAdmin` sans conclure
- Ne verifier le role qu'une fois l'authentification resolue

```typescript
export function useAdmin(): UseAdminReturn {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!user) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    const check = async (): Promise<void> => {
      // ... RPC call inchangé
    };

    check();
  }, [user, authLoading]);

  return { isAdmin, loading };
}
```

Aucune autre modification necessaire. Le composant `AdminPage` et le `Navbar` fonctionneront correctement une fois cette course eliminee.

