var myPlugin = function () {
    function myPlugin(params) {
        if (!(this instanceof myPlugin)) {
            return new myPlugin(params);
        }
        this.initialize.apply(this, arguments);
    }
    myPlugin.prototype = {
        initialize: function (options) {
            this.options = options;
            this.fromElement = document.getElementById(this.options.from) ;
            this.toElement = document.getElementById(this.options.to) ;

            this.handlers();
        },
        handlers: function() {
            var _this = this;
            this.calendar = document.createElement('div');
            this.fromElement.onfocus = function() {
                _this.showCalendar('from');
            };
            //this.fromElement.onblur = function() {
            //    _this.hideCalendar();
            //};
            this.toElement.onfocus = function() {
                _this.showCalendar('to');
            };
            //this.toElement.onblur = function() {
            //    _this.hideCalendar();
            //};
            this.calendar.addEventListener('click', function(e) {
                console.log(e);
            });
        },
        showCalendar: function (type) {
            this.calendar.innerHtml = '';
            var d = new Date();
            d.setDate(d.getDate() - d.getDate() + 1);

            var mon = d.getMonth();
            var table = '';

            var getDay = function (date) {
                var day = date.getDay();
                if (day == 0) day = 7;
                return day - 1;
            };

            table += '<table>';
            table += '<tr><th>'+this.options.dayLabel[0]+'</th><th>'+this.options.dayLabel[1]+'</th><th>'+this.options.dayLabel[2]+'</th><th>'+this.options.dayLabel[3]+'</th><th>'+this.options.dayLabel[4]+'</th><th>'+this.options.dayLabel[5]+'</th><th>'+this.options.dayLabel[6]+'</th></tr><tr>';

            for (var i = 0; i < getDay(d); i++) {
                table += '<td></td>';
            }

            while (d.getMonth() == mon) {
                table += '<td>' + d.getDate() + '</td>';

                if (getDay(d) % 7 == 6) {
                    table += '</tr><tr>';
                }

                d.setDate(d.getDate() + 1);
            }

            if (getDay(d) != 0) {
                for (var i = getDay(d); i < 7; i++) {
                    table += '<td></td>';
                }
            }

            table += '</tr></table>';

            this.calendar.innerHTML = table;

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
    to: 'dateTo',
    width: '300px',
    monthLabel: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    dayLabel: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
});
