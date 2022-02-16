import withGuide from './withGuide';
import TextGuideView from './views/Text';
import PointGuideView from './views/Point';
import LineGuideView from './views/Line';
import ArcGuideView from './views/Arc';
import RectGuideView from './views/Rect';
import ImageGuideView from './views/Image';
import TagGuideView from './views/Tag';

const DefaultGuideView = () => null;
const TextGuide = withGuide(TextGuideView);
const PointGuide = withGuide(PointGuideView);
const LineGuide = withGuide(LineGuideView);
const ArcGuide = withGuide(ArcGuideView);
const RectGuide = withGuide(RectGuideView);
const ImageGuide = withGuide(ImageGuideView);
const TagGuide = withGuide(TagGuideView)

export default withGuide(DefaultGuideView);

export { withGuide, TextGuide, PointGuide, ArcGuide, LineGuide, RectGuide, ImageGuide, TagGuide };
