import withGuide from './withGuide';
import TextGuideView from './views/Text'
import PointGuideView from './views/Point'
import LineGuideView from './views/Line'

const DefaultGuideView = () => null;
const TextGuide = withGuide(TextGuideView);
const PointGuide = withGuide(PointGuideView);
const LineGuide = withGuide(LineGuideView);

export default withGuide(DefaultGuideView);
export { withGuide, TextGuide, PointGuide, LineGuide }