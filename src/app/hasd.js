const MODAL_NAME = 'modal_video_container';
 
  const WIDGET_NAME = '.vreels';
 
  const config = { attributes: true, childList: true, subtree: false };
 
  const callback = (mutationList, _observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        loadAdForReels({});
        console.log('%c Prisa_Brand_Solutions ', 'color: #fff; background-color: #03579e; border-radius: 4px; ', '--> ReelsAd Ads Load:');
        _observer.disconnect();
      }
    }
  };
  const callbackWidget = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation) {
        if (document.querySelectorAll(WIDGET_NAME)[0]) {
          console.log('%c Prisa_Brand_Solutions ', 'color: #fff; background-color: #03579e; border-radius: 4px; ', '--> ReelsAd widget found:', document.querySelectorAll(WIDGET_NAME)[0]);
          const _observer = new MutationObserver(callback);
          _observer.observe(document.getElementById(MODAL_NAME), config);
          observer.disconnect();
        }
      }
    }
  };
 
  const observer = new MutationObserver(callbackWidget);
  observer.observe(document.querySelectorAll('body')[0], config);

 
function loadAdForReels({ target = '.tiktok-ad' }) {
  const adSpace = document.querySelectorAll(target);
  if (adSpace.length === 0) {
    console.log('%c Prisa_Brand_Solutions ', 'color: #fff; background-color: #03579e; border-radius: 4px; ', '--> ReelsAd:', 'target not found');
    return;
  }
 
  adSpace.forEach((element, index) => {
    const positionName = `MPU${index + 1}`;
    const div = document.createElement('div');
    div.id = `${PBS.pageSetup.divid}_${Math.floor(Math.random() * 10000)}-${positionName}`;
    element.appendChild(div);
    PBS.fn.requestAd([{ d: div.id, p: positionName, s: [[300, 600], [300, 250]] }]);
  });

}