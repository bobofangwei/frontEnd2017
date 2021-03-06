var UserIn=(function(){
    var rowList=getById('rowList'),
        consoleTa=getById('commandTa'),
        regWrap=/\n/,         
        regCommands=[/^(go)(?:\s+(\d+))?$/,/^(turn(?:Left|Right|Bottom))$/,/^(move(?:Left|Right|Bottom|Top))(?:\s+(\d+))?$/,/^(tra(?:Left|Right|Bottom|Top))(?:\s+(\d+))?$/];//有效的命令格式
   
    function addNum(){
        var value=consoleTa.value,
            len=value.split(regWrap).length,
            curStr='';
        if(len===rowList.children.length){
            return;
        }
        for(var i=1;i<=len;i++){
            curStr+='<div>'+i+'</div>';
        }
        rowList.innerHTML=curStr;
    }
    //textarea左侧有一列可以显示当前行数的列（代码行数列），列数保持和textarea中一致
    //当textarea发生上下滚动时，代码行数列同步滚动
    consoleTa.addEventListener('keyup',function(e){
        addNum();
    },false);
    consoleTa.addEventListener('scroll',function(e){
        rowList.scrollTop=this.scrollTop;
    },false);
    var UserIn={
        init:function(piece){
            this.piece=piece;
        },
        execute:function(){
            var value=consoleTa.value,
                commands=value.split(/\n/),
                len=commands.length,
                i=0,
                self=this,
                timer,
                stack=[];
                for(i=len-1;i>=0;i--){
                    stack[stack.length]={'index':i,'command':commands[i]};
                }
                timer=setInterval(function(){
                    var curItem=stack.pop();
                    if(!curItem){
                        clearInterval(timer);
                        return;
                    }

                    var curCommand=curItem['command'],
                        curIndex=curCommand['index'],
                        regResult=self.valid(curCommand),
                        num;
                    if(regResult===false){
                        rowList.children[curIndex].className='error';
                    }else{
                        curCommand=regResult[1];
                        num=regResult[2]&&(+regResult[2]);
                        if(typeof num==='number'){
                            while(--num){
                                stack[stack.length]={'index':curIndex,'command':curCommand};
                            }
                        }
                        self.piece[curCommand].apply(self.piece,null);
                    }


                },500);

        },
        valid:function(commandText){
            var regResult;
            for(var i=0,len=regCommands.length;i<len;i++){
                if((result=commandText.match(regCommands[i]))!=null){
                    return result;
                }
            }
            return false;
        },
        clear:function(){
            //将输入命令的textArea进行清空
            consoleTa.value='';
            rowList.innerHTML='';
        }
    };
    return UserIn;
})();
