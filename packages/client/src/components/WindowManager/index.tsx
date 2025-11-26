import { ContentRender } from '../Folder/Folder';
import { Window } from '@/components/Window/Window';
import { useContext } from 'react';
import { AppContext } from '@/context';
export const WindowManager: React.FC = () => {
  const { flatedSource, windowContext } = useContext(AppContext);
  return (
    <div>
      {windowContext.activeWindows.map((win) => (
        <Window
          key={win.trigger}
          isOpen={win.isOpen}
          onClose={() => windowContext.closeWindow(win.trigger)}
          title={flatedSource.get(win.trigger)?.name || 'unknown'}
          style={{ zIndex: win.zIndex }}
        >
          <ContentRender />
        </Window>
      ))}
    </div>
  );
};
