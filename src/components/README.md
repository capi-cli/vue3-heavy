## Components

这个目录中的组件将自动注册参考 [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-https://github.com/antfu/unplugin-vue-components).

#### 弹窗使用
 

```
  //注册
  const { open, forConfirm, close } = useDialogForm({
    title: '提现提示',
    schema: {
      type: 'object',
      properties: {
        xxx: {
          'x-component': '.Input',
          title: '名称',
          default: ' ',
        },
      },
    },
    after: () => h('div', '注意：平台代充时，每次充值金额不可大于50000.00元'),
    effect(f) {},
  });
  //点击确认事件
  forConfirm(() => {});
  // 打开弹窗
  open();
```
