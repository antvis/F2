import withTreemap from './withTreemap';
import TreemapView, { TreemapProps } from './treemapView';

export { TreemapProps, withTreemap, TreemapView };

export default withTreemap<TreemapProps>(TreemapView);
