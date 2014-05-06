(function($){
    var JTester = function (r) {
        var begin = r.indexOf('/');
        var end = r.lastIndexOf('/');
        var flags = r.match(/\/([igm]{0,3})$/i)[1];
        this.r = new RegExp(r.substring(begin + 1, end), flags);
        console.log(flags + "\n" +this.r);
    };

    JTester.prototype = {
        constructor: JTester,
        exec: function (str) {
            var result,
                counter = 1;

            while ((result = this.r.exec(str))!==null) {
                this.printToTable(counter, result);
                counter++;
                if (!this.r.global) {
                    break;
                }
            }
        },
        printToTable: function (counter, result) {
            var table = $('#outputTable');
            var cell = $('<tr>');
            cell.append($('<td>').text(counter));
            cell.append($('<td>').text(result[0]));
            cell.append($('<td>').text(result.index));
            table.append(cell);
            if (result.length > 1) {
                cell = $('<tr>');
                for (var i = 1; i < result.length; i++) {
                    cell.append($('<td>').text(counter + '-' + i + ' -> SubString'));
                    cell.append($('<td>').text(result[i]));
                    cell.append($('<td>'));
                }
                table.append(cell);
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