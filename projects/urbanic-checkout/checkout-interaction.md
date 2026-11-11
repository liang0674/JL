# 支付体验设计说明

## 共用交互结构

统一支付方式的选择与切换、展开与收起、输入区域的呈现、规则与限制提示、支付前确认及状态反馈。

## 保留支付方式的必要差异

银行卡展示卡号、持卡人、有效期和 CVV，分期展示期数和相关选项，钱包或本地支付方式展示必要账号信息和特定操作。金额限制、使用要求和当地所需字段按适用场景呈现。

## 从银行卡切换到分期

选择状态和展开规则保持一致，输入区则从银行卡字段切换为分期期数与适用条件。订单摘要仍提供优惠、费用和应付总额，便于付款前核对。

## 从独立页面拆成可组合模块

为支持前置、后置和多终端场景，将支付区域拆为支付方式选择、信用卡或借记卡表单、其他支付方式、使用条件与提示、账单信息、订单摘要和付款确认。

## 定义复用与条件展示规则

各模块按照统一的交互规则工作，根据当前支付方式和场景调整内容与状态。我与研发对齐模块的实现边界，以及何时复用、何时显示特定字段与提示。

## 桌面端｜支付与订单摘要并排

利用较宽的页面空间，用户可在填写支付信息时核对优惠、费用和应付金额。

## 移动端｜按操作顺序排列

窄屏采用单列布局，按支付选择、必要信息、金额核对和确认操作组织内容。

## 共享规则｜调整布局，保持任务一致

跨端复用支付方式、表单状态及提示反馈，区分可伸缩区域和相对固定区域，让结构随屏幕宽度变化，同时保持任务顺序清晰。

## 支付图标

统一支付图标的尺寸、对齐和展示方式，同时遵循不同支付品牌的识别要求。

## 字体与信息层级

通过字号和字重区分支付方式、输入字段、必要说明和最终金额。

## 色彩与反馈

用统一的基础色与必要的强调色，区分普通信息、优惠和状态反馈。

## 表单一致性

统一输入框、选择状态、提示、分隔和按钮，让用户更容易识别不同支付模块中的同类操作。

# Payment Experience Design Notes

## Shared interaction structure

Standardize selection, switching, expansion, input visibility, notices, confirmation and feedback.

## Method-specific requirements

Cards show the card number, cardholder, expiry and CVV. Installments show available terms. Wallets and local methods show the required account details and actions. Limits, conditions and local fields appear where applicable.

## Switching from card to installments

Selection and expansion behave consistently while the form changes from card fields to installment terms and conditions. Discounts, fees and the amount due remain available for review.

## From separate pages to composable modules

To support both checkout entry points and multiple devices, split the experience into method selection, card forms, alternative methods, conditions and notices, billing information, order summary and confirmation.

## Define reuse and conditional display

Modules share interaction rules and adapt their content and state to the selected method and scenario. I aligned the implementation boundaries and visibility rules with engineering.

## Desktop | Payment beside the order summary

Use the wider screen to let shoppers review discounts, fees and the total while entering payment details.

## Mobile | A single column in task order

Arrange method selection, required details, amount review and confirmation in a single column.

## Shared rules | Adapt the layout, preserve the task

Reuse payment, form state and feedback rules. Define flexible and relatively fixed regions so the layout adapts while the task sequence remains clear.

## Payment iconography

Align icon sizing and placement while respecting each payment brand’s identity.

## Typography and hierarchy

Use type size and weight to distinguish methods, fields, guidance and the final amount.

## Color and feedback

Use consistent base and accent colors to distinguish ordinary content, discounts and feedback.

## Form consistency

Standardize fields, selection states, notices, dividers and buttons so common actions are recognizable across modules.
