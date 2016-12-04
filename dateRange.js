var myPlugin = function () {
    function myPlugin(params) {
        if (!(this instanceof myPlugin)) {
            return new myPlugin(params);
        }
        this.initialize.apply(this, arguments);
    }
    myPlugin.prototype = {
        initialize: function (options) {
            this.fromElement = document.getElementById(options.from) ;
            this.toElement = document.getElementById(options.to) ;


            this.handlers();
        },
        handlers: function() {
            this.fromElement.onfocus = this.showCalendar();
            this.fromElement.onblur = this.hideCalendar;
        },
        showCalendar: function (type) {
            this.calendar = document.createElement('div');
            this.calendar.innerText = 'asdasd';
            document.body.appendChild(this.calendar);
        },
        hideCalendar: function () {
            this.calendar.outerHTML = "";
            delete this.calendar;
        }
    };
    return myPlugin;
}();

myPlugin({
    from: 'dateFrom',
    to: 'dateTo'
});
