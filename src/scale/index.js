import { Scale, getScale } from '@antv/scale';

const Linear = getScale('linear');
const Identity = getScale('identity');
const Category = getScale('category');
const TimeCat = getScale('timeCat');

Scale.Linear = Linear;
Scale.Identity = Identity;
Scale.Category = Category;
Scale.Cat = Category;
Scale.TimeCat = TimeCat;

export default Scale;
