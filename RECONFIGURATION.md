## 重构阶段目标


### 一、一期重构，代码分支feature/reconfiguration_v1

#### 重构目标:

1. 重新审视用户交互及数据展示，对首页、项目创建、项目详情UI

2. UI库由blueprintjs更换为ant.design。相应的表单框架选择formsy-react

3. 使用stylus处理css问题。针对ant.design不使用css moduels。用户自定义模块开启css modules


### 二、二期重构，代码分支feature/reconfiguration_v2

### 重构目标：

1. 由于本应用为standalone型应用，不能使用react-router。移除rect-router，使用state模拟
