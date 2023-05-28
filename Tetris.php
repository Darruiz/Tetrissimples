
<?php
$firstname = $lastname = $email = '';
$score = 0;
?>

<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="Tetris.css">
</head>
<body onload = "buildMap()">
  <script type="text/javascript" src="Tetris.js" ></script>
<h1 class="ww">Tetris</h1>
<div id="outer">
  
  <div id="playconsole">
  </div>
  <div id="next">
    <button id = 'start' onclick="start()" id='start'>Start</button>
    <button id  = "pause" onclick="pause()">Pause</button>
    <button id = 'help' onclick="help()">Help</button>
  </div>
  <div id="score1" class="ww">
   Score: Essa versão ainda n tem score 
  </div>
</div>

</from>
</body>

</html>