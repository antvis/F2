import withScrollBar, { ScrollBarProps } from './withScrollBar';
import ScrollBarView from './scrollBarView';
import withZoom from '../zoom';

export { ScrollBarProps, withScrollBar, ScrollBarView };
export default withZoom(withScrollBar(ScrollBarView));
