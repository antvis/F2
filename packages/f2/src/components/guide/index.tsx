import withGuide, { GuideProps } from './withGuide';
import TextGuideView from './views/Text';
import PointGuideView from './views/Point';
import LineGuideView from './views/Line';
import ArcGuideView from './views/Arc';
import RectGuideView from './views/Rect';
import ImageGuideView from './views/Image';
import TagGuideView from './views/Tag';
import LottieGuideView from './views/Lottie';
import PolylineGuideView from './views/Polyline';

const DefaultGuideView = () => null;

const TextGuide = withGuide(TextGuideView);
TextGuide.displayName = 'TextGuide';

const PointGuide = withGuide(PointGuideView);
PointGuide.displayName = 'PointGuide';

const LineGuide = withGuide(LineGuideView);
LineGuide.displayName = 'LineGuide';

const ArcGuide = withGuide(ArcGuideView);
ArcGuide.displayName = 'ArcGuide';

const RectGuide = withGuide(RectGuideView);
RectGuide.displayName = 'RectGuide';

const ImageGuide = withGuide(ImageGuideView);
ImageGuide.displayName = 'ImageGuide';

const TagGuide = withGuide(TagGuideView);
TagGuide.displayName = 'TagGuide';

const LottieGuide = withGuide(LottieGuideView);
LottieGuide.displayName = 'LottieGuide';

const PolylineGuide = withGuide(PolylineGuideView);
PolylineGuide.displayName = 'PolylineGuide';

export { GuideProps };

export default withGuide(DefaultGuideView);

export {
  withGuide,
  TextGuide,
  PointGuide,
  ArcGuide,
  LineGuide,
  RectGuide,
  ImageGuide,
  TagGuide,
  LottieGuide,
  PolylineGuide,
};
