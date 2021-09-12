import withGuide from "./withGuide";
import TextGuideView from "./views/Text";
import PointGuideView from "./views/Point";
import LineGuideView from "./views/Line";
import ArcGuideView from "./views/Arc";

const DefaultGuideView = () => null;
const TextGuide = withGuide(TextGuideView);
const PointGuide = withGuide(PointGuideView);
const LineGuide = withGuide(LineGuideView);
const ArcGuide = withGuide(ArcGuideView);

export default withGuide(DefaultGuideView);

export { withGuide, TextGuide, PointGuide, ArcGuide, LineGuide };
