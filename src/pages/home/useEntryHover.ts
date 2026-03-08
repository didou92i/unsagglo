import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface EntryHoverReturn {
  hovered: boolean;
  visiteurExpanded: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onVisiteurEnter: () => void;
  onVisiteurLeave: () => void;
  goToMembers: () => void;
  goToNews: () => void;
  goToElections: () => void;
}

const useEntryHover = (): EntryHoverReturn => {
  const [hovered, setHovered] = useState(false);
  const [visiteurExpanded, setVisiteurExpanded] = useState(false);
  const navigate = useNavigate();

  const onMouseEnter = useCallback(() => setHovered(true), []);
  const onMouseLeave = useCallback(() => setHovered(false), []);
  const onVisiteurEnter = useCallback(() => setVisiteurExpanded(true), []);
  const onVisiteurLeave = useCallback(() => setVisiteurExpanded(false), []);
  const goToMembers = useCallback(() => navigate("/members"), [navigate]);
  const goToNews = useCallback(() => navigate("/news"), [navigate]);
  const goToElections = useCallback(() => navigate("/elections"), [navigate]);

  return {
    hovered,
    visiteurExpanded,
    onMouseEnter,
    onMouseLeave,
    onVisiteurEnter,
    onVisiteurLeave,
    goToMembers,
    goToNews,
    goToElections,
  };
};

export default useEntryHover;
