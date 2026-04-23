const WarningBanner = (): JSX.Element => (
  <div
    className="w-full flex items-center justify-center px-4 text-center border-t border-b"
    style={{
      backgroundColor: "#fff8e1",
      borderColor: "rgba(231, 65, 36, 0.5)",
      borderTopWidth: "0.5px",
      borderBottomWidth: "0.5px",
      minHeight: "40px",
      color: "#a04000",
      fontSize: "12px",
    }}
  >
    <p>
      <span aria-hidden="true">ⓘ</span> Version préliminaire — Ce simulateur se
      base sur les annonces gouvernementales du 21 avril 2026. Il sera mis à jour
      dès la publication du décret officiel (attendu avant fin mai 2026).
    </p>
  </div>
);

export default WarningBanner;
