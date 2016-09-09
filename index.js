/**
 * mbubble 气泡提示
 * Created by maotingfeng on 16/7/27.
 */
(function( factory ){
    var md = typeof define == "function" ;
    if( typeof module === 'object' && typeof module.exports === 'object' ){
        module.exports = factory() ;
    }else if( md && define.amd ){
        define( ['require','jquery'] , factory ) ;
    }else if( md && define.cmd ) {
        define( 'ymdate' , ['jquery'] , factory ) ;
    }else{
        factory( function(){ return window.jQuery } ) ;
    }
})(function( require ){
    var $ = require('jquery') ;
    // 绑定jquery方法
    $.extend( $.fn , {
        /* mbubble 鼠标悬浮提示插件 */
        mbubble: function( setting ){
            var config = {} ;
            $.extend( config , setting ) ;
            var $this = this ,
                repaceReg = /\*\*\*/g ,
                tmpl = config.tmpl ,
                type = config.type ,
                place = config.place ,
                hideDelay = $.isNumeric( config.hideDelay ) ? config.hideDelay : 2000  ,
                origin_tmpl = '<span class="mbubble_title">***</span>' ;
            switch ( type ){
                case 'fastShow':
                    showTitle.call( $this ) ;
                    setTimeout( function(){
                        hideTitle.call( $this ) ;
                        config.callback && config.callback() ;
                    } , hideDelay ) ;
                    break;
                case 'mouseenter':
                    bindMouseEnter() ;
                    break;
                default:
                    bindMouseEnter() ;
                    break;
            } ;
            function bindMouseEnter(){
                $this.on( "mouseenter.mbubble" , function(){
                    showTitle.call( this ) ;
                } ).on( "mouseleave.mbubble" , function(){
                    hideTitle.call( this ) ;
                } ) ;
            }
            function showTitle(){
                var $this = $( this ) ,
                    html_tmp = '' ,
                    html = '' ,
                    $html = null ,
                    $prompt = $this.find(".mbubble_title") ,
                    title = $.trim( $this.data( 'title' ) ) ;
                if( $prompt.length > 0 ){
                    $prompt.addClass('on') ;
                }else{
                    if( tmpl ){
                        html_tmp = tmpl.replace( repaceReg , title ) ;
                        html = origin_tmpl.replace( repaceReg , html_tmp ) ;
                    }else{
                        html = origin_tmpl.replace( repaceReg , title ) ;
                    }
                    $html = $( html )
                    $this.append( $html ) ;
                    setTimeout(function(){ $html.addClass('on') ; }, 0 ) ;   // 解决第一次动效失败
                }
            }
            function hideTitle(){
                var $this = $( this ) ,
                    $prompt = $this.find(".mbubble_title") ;
                $prompt.removeClass('on') ;
            }
        }
    } ) ;
} );