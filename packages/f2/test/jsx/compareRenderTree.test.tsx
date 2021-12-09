import { jsx, compareRenderTree } from '../../src/jsx';

describe('compareRenderTree', () => {
  describe('null', () => {
    it('都为null', () => {
      const renderElement = compareRenderTree(null, null);
      expect(renderElement).toBe(null);
    });
  });

  describe('删除', () => {
    it('单节点', () => {
      const nextElement = null;
      const lastElement = <text />;
      const renderElement = compareRenderTree(nextElement, lastElement);
      expect(renderElement).toBe(null);
    });

    it('存在子节点', () => {
      const nextElement = null;
      const lastElement = (
        <group>
          <text />
        </group>
      );
      const renderElement = compareRenderTree(nextElement, lastElement);
      expect(renderElement).toBe(null);
    });

    it('单节点-有动画', () => {
      const nextElement = null;
      const lastElement = <text animation={{ leave: {} }} />;
      const renderElement = compareRenderTree(nextElement, lastElement);
      expect(renderElement.status).toBe('delete');
    });

    it('存在子节点', () => {
      const nextElement = null;
      const lastElement = (
        <group>
          <text animation={{ leave: {} }} />
        </group>
      );
      const renderElement = compareRenderTree(nextElement, lastElement);
      expect(renderElement.status).toBe('delete');
      expect(renderElement.props.children.status).toBe('delete');
    });
  });

  describe('一个节点存在key', () => {
    it('一个节点存在key', () => {
      const nextElement = <group key="2"></group>;
      const lastElement = <group key="1"></group>;

      const renderElement = compareRenderTree(nextElement, lastElement);
      expect(renderElement.length).toBe(2);
      expect(renderElement[0]).toBe(null);
      expect(renderElement[1].key).toBe('2');
      expect(renderElement[1].status).toBe('appear');
    });

    it('一个节点存在key-有动画', () => {
      const nextElement = <group key="2"></group>;
      const lastElement = <group key="1" animation={{ leave: {} }}></group>;

      const renderElement = compareRenderTree(nextElement, lastElement);
      expect(renderElement.length).toBe(2);
      expect(renderElement[0].key).toBe('1');
      expect(renderElement[0].status).toBe('delete');
      expect(renderElement[1].key).toBe('2');
      expect(renderElement[1].status).toBe('appear');
    });
  });

  describe('数组', () => {
    it('不存在key', () => {
      const nextElement = (
        <group>
          <text />
          <text />
        </group>
      );
      const lastElement = (
        <group>
          <text />
          <text />
        </group>
      );
      const renderElement = compareRenderTree(nextElement, lastElement);
      expect(renderElement.status).toBe('update');
      expect(renderElement.props.children.length).toBe(2);
      expect(renderElement.props.children[0].status).toBe('update');
      expect(renderElement.props.children[1].status).toBe('update');
    });

    it('类型变化', () => {
      const nextElement = (
        <group>
          <text />
          <text />
        </group>
      );
      const lastElement = (
        <group>
          <text />
          <rect />
        </group>
      );
      const renderElement = compareRenderTree(nextElement, lastElement);
      // 原对象
      expect(nextElement.props.children.length).toBe(2);

      expect(renderElement.props.children.length).toBe(2);
      expect(renderElement.props.children[0].type).toBe('text');
      expect(renderElement.props.children[0].status).toBe('update');

      // 是个数组
      expect(renderElement.props.children[1].length).toBe(2);
      expect(renderElement.props.children[1][0]).toBe(null);
      expect(renderElement.props.children[1][1].type).toBe('text');
      expect(renderElement.props.children[1][1].status).toBe('appear');
    });

    it('空节点', () => {
      const nextElement = (
        <group>
          <text />
          <text />
        </group>
      );
      const lastElement = (
        <group>
          <text />
          {null}
          <rect />
        </group>
      );
      const renderElement = compareRenderTree(nextElement, lastElement);
      // 原对象
      expect(nextElement.props.children.length).toBe(2);

      expect(renderElement.props.children.length).toBe(3);
      expect(renderElement.props.children[0].type).toBe('text');
      expect(renderElement.props.children[0].status).toBe('update');

      expect(renderElement.props.children[1].type).toBe('text');
      expect(renderElement.props.children[1].status).toBe('appear');
      expect(renderElement.props.children[2]).toBe(null);
    });

    it('新元素存在空节点', () => {
      const nextElement = (
        <group>
          <text />
          {null}
          <text />
        </group>
      );
      const lastElement = (
        <group>
          <text />
          <rect />
        </group>
      );
      const renderElement = compareRenderTree(nextElement, lastElement);
      // 原对象
      expect(nextElement.props.children.length).toBe(3);

      expect(renderElement.props.children.length).toBe(3);
      expect(renderElement.props.children[0].type).toBe('text');
      expect(renderElement.props.children[0].status).toBe('update');

      expect(renderElement.props.children[1]).toBe(null);

      expect(renderElement.props.children[2].type).toBe('text');
      expect(renderElement.props.children[2].status).toBe('appear');
    });

    it('1个到多个', () => {
      const nextElement = (
        <group>
          <text />
          <text />
        </group>
      );
      const lastElement = (
        <group>
          <text />
        </group>
      );
      const renderElement = compareRenderTree(nextElement, lastElement);
      // 原对象
      expect(nextElement.props.children.length).toBe(2);

      expect(renderElement.props.children.length).toBe(2);
      expect(renderElement.props.children[0].type).toBe('text');
      expect(renderElement.props.children[0].status).toBe('update');
      expect(renderElement.props.children[1].type).toBe('text');
      expect(renderElement.props.children[1].status).toBe('appear');
    });

    it('多个到1个', () => {
      const nextElement = (
        <group>
          <text />
        </group>
      );
      const lastElement = (
        <group>
          <text />
          <text />
        </group>
      );
      const renderElement = compareRenderTree(nextElement, lastElement);
      // 原对象
      expect(nextElement.props.children.type).toBe('text');
      expect(renderElement.props.children.length).toBe(2);
      expect(renderElement.props.children[0].type).toBe('text');
      expect(renderElement.props.children[0].status).toBe('update');
      expect(renderElement.props.children[1]).toBe(null);
    });

    it('不存在key map', () => {
      const nextElement = (
        <group>
          {[1, 2].map((i) => {
            return <text />;
          })}
        </group>
      );
      const lastElement = (
        <group>
          {[1, 3].map((i) => {
            return <text />;
          })}
        </group>
      );
      const renderElement = compareRenderTree(nextElement, lastElement);
      expect(renderElement.status).toBe('update');
      expect(renderElement.props.children.length).toBe(2);
      expect(renderElement.props.children[0].status).toBe('update');
      expect(renderElement.props.children[1].status).toBe('update');
    });

    it('存在key', () => {
      const nextElement = (
        <group>
          <text key={1} />
          <text key={2} />
        </group>
      );
      const lastElement = (
        <group>
          <text key={1} />
          <text key={3} />
        </group>
      );
      const renderElement = compareRenderTree(nextElement, lastElement);
      // 原对象
      expect(nextElement.status).toBe(undefined);
      expect(nextElement.props.children.length).toBe(2);

      expect(renderElement.status).toBe('update');
      expect(renderElement.props.children.length).toBe(3);
      expect(renderElement.props.children[0].status).toBe('update');
      // 空为添加
      expect(renderElement.props.children[1].status).toBe('appear');
      expect(renderElement.props.children[2]).toBe(null);
    });

    it('存在key map', () => {
      const nextElement = (
        <group>
          {[1, 2].map((i) => {
            return <text key={i} />;
          })}
        </group>
      );
      const lastElement = (
        <group>
          {[1, 3].map((i) => {
            return <text key={i} />;
          })}
        </group>
      );
      const renderElement = compareRenderTree(nextElement, lastElement);
      expect(renderElement.status).toBe('update');
      expect(renderElement.props.children.length).toBe(3);

      expect(renderElement.props.children[0].status).toBe('update');
      expect(renderElement.props.children[1].status).toBe('appear');
      expect(renderElement.props.children[2]).toBe(null);
    });
  });
});
