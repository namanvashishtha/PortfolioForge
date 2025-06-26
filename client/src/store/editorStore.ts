import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ComponentData {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: ComponentData[];
}

export interface EditorState {
  components: ComponentData[];
  selectedComponentId: string | null;
  draggedComponent: ComponentData | null;
  isPreviewMode: boolean;
  portfolioId: number | null;
  portfolioName: string;
  isSaving: boolean;
  
  // Actions
  addComponent: (component: ComponentData) => void;
  updateComponent: (id: string, props: Record<string, any>) => void;
  removeComponent: (id: string) => void;
  selectComponent: (id: string | null) => void;
  setDraggedComponent: (component: ComponentData | null) => void;
  setPreviewMode: (isPreview: boolean) => void;
  setPortfolioId: (id: number | null) => void;
  setPortfolioName: (name: string) => void;
  setSaving: (isSaving: boolean) => void;
  loadPortfolio: (components: ComponentData[], name: string, id: number) => void;
  clearEditor: () => void;
}

export const useEditorStore = create<EditorState>()(
  devtools(
    (set, get) => ({
      components: [],
      selectedComponentId: null,
      draggedComponent: null,
      isPreviewMode: false,
      portfolioId: null,
      portfolioName: 'Untitled Portfolio',
      isSaving: false,

      addComponent: (component) =>
        set((state) => ({
          components: [...state.components, component],
        })),

      updateComponent: (id, props) =>
        set((state) => ({
          components: state.components.map((comp) =>
            comp.id === id ? { ...comp, props: { ...comp.props, ...props } } : comp
          ),
        })),

      removeComponent: (id) =>
        set((state) => ({
          components: state.components.filter((comp) => comp.id !== id),
          selectedComponentId: state.selectedComponentId === id ? null : state.selectedComponentId,
        })),

      selectComponent: (id) =>
        set(() => ({
          selectedComponentId: id,
        })),

      setDraggedComponent: (component) =>
        set(() => ({
          draggedComponent: component,
        })),

      setPreviewMode: (isPreview) =>
        set(() => ({
          isPreviewMode: isPreview,
        })),

      setPortfolioId: (id) =>
        set(() => ({
          portfolioId: id,
        })),

      setPortfolioName: (name) =>
        set(() => ({
          portfolioName: name,
        })),

      setSaving: (isSaving) =>
        set(() => ({
          isSaving,
        })),

      loadPortfolio: (components, name, id) =>
        set(() => ({
          components,
          portfolioName: name,
          portfolioId: id,
          selectedComponentId: null,
        })),

      clearEditor: () =>
        set(() => ({
          components: [],
          selectedComponentId: null,
          draggedComponent: null,
          isPreviewMode: false,
          portfolioId: null,
          portfolioName: 'Untitled Portfolio',
        })),
    }),
    {
      name: 'editor-store',
    }
  )
);
