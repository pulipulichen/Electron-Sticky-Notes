#include <Array.au3>
#include <MsgBoxConstants.au3>
;#pragma compile(Icon, '../../app/imgs/icon256.ico')
;FileChangeDir(@ScriptDir)
;ShellExecute("C:\Windows\notepad.exe", "", "", "", @SW_HIDE)

;For $i = 1 To $CmdLine[0]
   ;ShellExecute('run.bat', $CmdLine[$i], "", "", @SW_HIDE)
   ;Run($CmdLine[$i])
;Next


For $i = 1 To $CmdLine[0]
   Local $cmd = '"' & $CmdLine[$i] & '"'
   ;MsgBox($MB_SYSTEMMODAL, "command line", $cmd)
   ShellExecute($cmd)
Next