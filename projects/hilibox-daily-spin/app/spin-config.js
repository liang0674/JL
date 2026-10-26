// Local preview values. Replace these with campaign data from the App when APIs are ready.
window.HILIBOX_SPIN_CONFIG = {
  id: 'daily-exclusive-preview',
  enabled: true,
  entryVisible: true,
  status: 'active',
  startsAt: null,
  endsAt: null,
  pointsEnabled: false,
  freeDrawsPerDay: 2,
  couponValidityHours: 72,
  timeZone: 'Asia/Baghdad',
  requestTimeoutMs: 12000,
  pointsPerDraw: 100,
  startingPoints: 300,
  pointsPrize: { id: 'points-200', value: '200', label: 'Points', type: 'points', points: 200 },
  previewPrizeIndexes: [6, 1, 4, 0, 2],
  prizes: [
    { id: 'iqd-5', value: 'IQD 5', label: 'Off', type: 'coupon' },
    { id: 'iqd-10', value: 'IQD 10', label: 'Off', type: 'coupon' },
    { id: 'iqd-15', value: 'IQD 15', label: 'Off', type: 'coupon' },
    { id: 'iqd-20', value: 'IQD 20', label: 'Off', type: 'coupon' },
    { id: 'iqd-25', value: 'IQD 25', label: 'Off', type: 'coupon' },
    { id: 'percent-10', value: '10%', label: 'Off', type: 'coupon' },
    { id: 'percent-15', value: '15%', label: 'Off', type: 'coupon' },
    {id:'gift',value:'Free',label:'Gift',type:'gift',products:[{id:'demo-lipstick',skuId:'demo-sku-lipstick',name:{en:'Rose Lipstick',ar:'أحمر شفاه وردي',zh:'玫瑰唇膏'},image:'images/demo-lipstick.svg',originalPrice:'24,000 IQD',stockRemaining:20},{id:'demo-serum',skuId:'demo-sku-serum',name:{en:'Glow Face Serum',ar:'سيروم إشراقة الوجه',zh:'焕亮精华液'},image:'images/demo-serum.svg',originalPrice:'38,000 IQD',stockRemaining:20},{id:'demo-cream',skuId:'demo-sku-cream',name:{en:'Hydrating Face Cream',ar:'كريم ترطيب الوجه',zh:'水润保湿面霜'},image:'images/demo-cream.svg',originalPrice:'32,000 IQD',stockRemaining:20}]}
  ]
};
