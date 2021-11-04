import './Loading.scss';

/**
 * https://loading.io/css/
 */
const Loading = () => (
  <div className={'flex justify-center'}>
    <div className={'lds-ellipsis'}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loading;
