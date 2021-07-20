import withGuide from './withGuide';
import ImageGuideView from './views/Image'
import TextGuideView from './views/Text'

const DefaultGuideView = () => null;

const Guides  = {
  ImageGuide: withGuide(ImageGuideView),
  TextGuide: withGuide(TextGuideView)
}


export default withGuide(DefaultGuideView);
export { withGuide, Guides }