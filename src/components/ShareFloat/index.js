import './index.less';
import handlebars from '@/utils/handlebars';
const templateIndex = require('./index.hbs');

/**
 * @class ShareFloat
 * @param { Object } context 需要渲染到哪个容器中，如果不传就 append 到 body 中
 * @param { Object } option 参数
 * {
 * }
 */
export default class ShareFloat {
  constructor(context, option) {
    // 默认参数
    const defaultOption = {
      src: 'https://source.tutorabc.com.cn/ext/images/website/vjr/landingpage/h5/AnnualReview2018/hi.gif'
    };

    // 判断是否传递了 context 参数
    if (context instanceof jQuery) {
      this.context = context;
    } else {
      this.context = null;
      option = context;
    }
    this.option = $.extend({}, defaultOption, option);

    this.init();
  }

  init() {
    this.render();
    this.getElement();
    this.bindEvent();
  }

  bindEvent() {
    this.el.$share.on('click', () => {
      typeof this.option.callback === 'function' ? this.option.callback() : console.error('类型错误');
    });
  }

  render() {
    const { src } = this.option;

    const html = handlebars(templateIndex, {
      src
    });
    
    this.context ? this.context.html(html) : $('body').append(html);
  }
  
  getElement() {
    this.el = {
      $share: $('.js_share-fixed')
    }
  }

  _hide() {
    this.el.$share.removeClass('show');
  }

  _show() {
    this.el.$share.addClass('show');
  }
};