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

            if(!this.options.from) {return false;}
            this.fromElement = document.getElementById(this.options.from) ;

            if(!!this.options.from) {
                this.toElement = document.getElementById(this.options.to) ;
            }

            this.handlers();
        },
        handlers: function() {
            var _this = this;
            this.fromElement.onfocus = function() {
                _this.showCalendar('from');
                _this.fromEvent = _this.fromElement;
            };
            this.toElement.onfocus = function() {
                _this.showCalendar('to');
                _this.fromEvent = _this.toElement;
            };

        },
        showCalendar: function (type, year, month) {
            var _this = this;
            if(this.calendar) {
                _this.hideCalendar();
            }
            this.calendar = document.createElement('div');
            this.calendar.id = this.options.id;
            this.calendar.style.width = this.options.width;
            var d;

            if(year && month) {
                d = new Date(year, month);
            } else {
                d = new Date();
                d.setDate(d.getDate() - d.getDate() + 1);
            }

            var mon = d.getMonth();
            var _tmp = '';

            var getDay = function (date) {
                var day = date.getDay();
                if (day == 0) day = 7;
                return day - 1;
            };

            _tmp += '<table style="width:100%; text-align:center">';
            _tmp += '<tr><td data-event="change-month" data-year="' + (d.getMonth() - 1 < 0 ? d.getFullYear() - 1 : d.getFullYear()) + '" data-month="' + (d.getMonth() - 1 < 0 ? 11 : d.getMonth() - 1) + '"><</td><td>'+this.options.monthLabel[d.getMonth()]+' '+d.getFullYear()+'</td><td data-event="change-month" data-year="' + (d.getMonth() + 1 > 11 ? d.getFullYear() + 1 : d.getFullYear()) + '" data-month="' + (d.getMonth() + 1 > 11 ? 0 : d.getMonth() + 1) + '">></td></tr>';
            _tmp += '</table>';

            _tmp += '<table style="width:100%">';
            _tmp += '<tr><th>'+this.options.dayLabel[0]+'</th><th>'+this.options.dayLabel[1]+'</th><th>'+this.options.dayLabel[2]+'</th><th>'+this.options.dayLabel[3]+'</th><th>'+this.options.dayLabel[4]+'</th><th>'+this.options.dayLabel[5]+'</th><th>'+this.options.dayLabel[6]+'</th></tr><tr>';

            for (var i = 0; i < getDay(d); i++) {
                _tmp += '<td></td>';
            }

            while (d.getMonth() == mon) {
                _tmp += '<td data-event="select-day" data-year="' + d.getFullYear() + '" data-month="' + d.getMonth() + '" data-day="' + d.getDate() + '">' + d.getDate() + '</td>';

                if (getDay(d) % 7 == 6) {
                    _tmp += '</tr><tr>';
                }

                d.setDate(d.getDate() + 1);
            }

            if (getDay(d) != 0) {
                for (var i = getDay(d); i < 7; i++) {
                    _tmp += '<td></td>';
                }
            }

            _tmp += '</tr></table>';

            this.calendar.innerHTML = _tmp;

            document.body.appendChild(this.calendar);

            this.days = document.querySelectorAll('#'+this.options.id+' [data-event]');

            for(var i=0; i< this.days.length; i++){

                this.days[i].onclick = function() {
                    switch(this.getAttribute('data-event')) {
                        case 'select-day':
                            _this.fromEvent.value = this.getAttribute('data-day') + '.' + this.getAttribute('data-month') + '.' + this.getAttribute('data-year');
                            if(type == 'from') {
                                _this.fromDate = 'asd';
                            }
                            _this.hideCalendar();
                        break;
                        case 'change-month':
                            _this.hideCalendar();
                            _this.showCalendar(type, this.getAttribute('data-year'), this.getAttribute('data-month'));

                        break;
                    }
                }
            }
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
    width: '200px',
    id: 'dateRange',
    monthLabel: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    dayLabel: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
});