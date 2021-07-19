import { jsx } from "@ali/f2-jsx";
import { upperFirst } from "@antv/util";
import Guides from "./components";

export default (props: any) => {
  const { guides, triggerRef } = props;

  return (
    <group ref={triggerRef}>
      {guides.map((guideProps) => {
        const { type } = guideProps;
        const Guide = Guides[upperFirst(type)];
        return <Guide {...guideProps} />;
      })}
    </group>
  );
};
