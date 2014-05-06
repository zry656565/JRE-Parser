(function($){
    var JTester = function (r) {
        var formatList = r.match(/^\/(.*)\/([igm]{0,3})$/i);
        this.r = new RegExp(formatList[1], formatList[2]);
    };

    JTester.prototype = {
        constructor: JTester,
        exec: function (str) {
            var result,
                counter = 1,
                cell = $('<tr>');
            if (this.r.global) {
                while ((result = this.r.exec(str))!==null) {
                    console.log(result);
                    cell.append($('<td>').text(counter));
                    cell.append($('<td>').text(result[0]));
                    cell.append($('<td>').text(result.index));
                    for (var i = 1; i < result.length; i++) {
                        cell.append($('<td>').text(counter + '-' + i));
                        cell.append($('<td>').text(result[i]));
                    }
                    counter++;
                    $('#outputTable').append(cell);
                    cell = $('<tr>');
                }
            }
        }
    };

    $(function(){
        $('#submit').click(function(){
            var regexp = $('[name=regexp]').val();
            var testString = $('[name=teststring]').val();
            var jt = new JTester(regexp);
            $('#outputTable').empty();
            $('#outputTable').append(
                $('<tr>').append($('<td>').text('Counter Id'))
                         .append($('<td>').text('Matched String'))
                         .append($('<td>').text('Matched Position'))
            );
            jt.exec(testString);
        });
    });
})(jQuery);