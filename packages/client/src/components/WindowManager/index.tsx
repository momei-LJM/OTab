import { ContentRender } from '../Folder/ContentRender';
import { Window } from '@/components/Window/Window';
import { useContext } from 'react';
import { AppContext, WindowsContext } from '@/context';
export const WindowManager: React.FC = () => {
  const { flatedSource } = useContext(AppContext);
  const { activeWindows, closeWindow, focusWindow, updateWindow } =
    useContext(WindowsContext);
  return (
    <div>
      {activeWindows.map((win) => (
        <Window
          key={win.trigger}
          isOpen={win.isOpen}
          onClose={() => closeWindow(win.trigger)}
          title={flatedSource.get(win.trigger)?.name || 'unknown'}
          style={{ zIndex: win.zIndex, ...(win.style || {}) }}
          onFocus={() => focusWindow(win)}
          onUpdate={(updates) => {
            updateWindow({
              ...win,
              style: {
                ...win.style,
                ...updates,
              },
            });
          }}
        >
          <ContentRender data={win} />
        </Window>
      ))}
    </div>
  );
};
