dict = {'1': "ㄅ", '2': "ㄉ", '3': "ˇ", '4': "ˋ", '5': "ㄓ", '6': "ˊ", '7': "˙", '8':"ㄚ", '9': "ㄞ", '0': "ㄢ", '-': "ㄦ", 'q': "ㄆ", 'w': "ㄊ", 'e': "ㄍ", 'r': "ㄐ", 't': "ㄔ", 'y': "ㄗ", 'u': "ㄧ", 'i': "ㄛ", 'o': "ㄟ", 'p': "ㄣ", 'a': "ㄇ", 's': "ㄋ", 'd': "ㄎ", 'f': "ㄑ", 'g': "ㄕ", 'h': "ㄘ", 'j': "ㄨ", 'k': "ㄜ", 'l': "ㄠ", ';': "ㄤ", 'z': "ㄈ", 'x': "ㄌ", 'c': "ㄏ", 'v': "ㄒ", 'b': "ㄖ", 'n': "ㄙ", 'm': "ㄩ", ',': "ㄝ", '.': "ㄡ", '/': "ㄥ", ' ': "ˉ"};
tone = ["ˇ","ˋ","ˊ","˙","ˉ"]

$(document).ready(function () {
  $("#decode-submit").click(function () {
    var input = $("#decode-input").val();
    var output = decode(input);
    $("#decode-output").val(output);
  });
});
function decode(str) {
  var result = "";
  for (i = 0; i < str.length; i++) {
    char = str.slice(i, i + 1).toLowerCase();
    if (
      i > 0 &&
      tone.includes(dict[str.slice(i - 1, i).toLowerCase()]) &&
      tone.includes(dict[char])
    ) {
      //如果連續兩個聲調/空格，若是 則直接打印原文
      result += str.slice(i, i + 1);
      continue;
    }
    if (
      i > 0 &&
      !dict.hasOwnProperty(str.slice(i - 1, i).toLowerCase()) &&
      tone.includes(dict[char])
    ) {
      //如果前面的字元沒包括在字典且當前字元為聲調 則直接打印原文
      result += str.slice(i, i + 1);
      continue;
    }
    if (!dict.hasOwnProperty(char)) {
      //判斷是否在字典內，若否 則直接打印原文
      result += str.slice(i, i + 1);
      continue;
    }

    result += dict[char];
  }
  return result;
}

// <!-- BC base_conversion-->
$(document).ready(function () {
  $("#BC-submit").click(function () {
    var base = $("#BC-base-input").val();
    var number = $("#BC-number-input").val();
    var baseto = $("#BC-baseto-input").val();
    var output = base_conversion(base, number, baseto);
    $("#BC-output").val(output);
  });
});

function base_conversion(base, number, baseto) {
  base = parseInt(base);
  baseto = parseInt(baseto);

  if (!number || !base || !baseto) {
    return;
  } //未輸入則不做任何事
  if (baseto < 2 || baseto > 36) {
    return "基底請設置在2到36之間";
  } //未在合理基底
  var result = parseInt(number, base).toString(baseto).toUpperCase();
  if (result == "NAN") {
    return "輸入有誤";
  }
  return result;
}




// <!-- Size conversion-->
$(document).ready(function () {
    $("#size-submit").click(function () {
      var size = $("#size-input").val();
      var input_unit = $("#size-input-unit").val();
      var output_unit = $("#size-output-unit").val();
      var output = size_conversion(size, input_unit, output_unit);
      $("#size-output").val(output);
    });
  });

function size_conversion(size, input_unit, output_unit) {
    return size*Math.pow(1024, input_unit-output_unit)
}

function sizeToString(size, toFixed) {
  if (size == 0) return "empty";
  var t = 1024;
  var n = toFixed || 2;
  var unit = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  var r = Math.floor(Math.log(size) / Math.log(t));
  return parseFloat((size / Math.pow(t, r)).toFixed(n)) + unit[r];
}

// function sizeToString(a, e) {
//     if (a == 0)
//         return "empty";
//     var t = 1024
//       , n = e || 2
//       , i = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
//       , r = Math.floor(Math.log(a) / Math.log(t));
//     return parseFloat((a / Math.pow(t, r)).toFixed(n)) + i[r]
// }