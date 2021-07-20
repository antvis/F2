import withGuide from './withGuide';
import ImageGuideView from './views/Image'
import TextGuideView from './views/Text'

const DefaultGuideView = () => null;

const ImageGuide = withGuide(ImageGuideView);
const TextGuide = withGuide(TextGuideView);

export default withGuide(DefaultGuideView);
export { withGuide, ImageGuide, TextGuide }