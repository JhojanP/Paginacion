class Paginacion{ 
    constructor(Id=""){
        this.Id= Id;
        this.TotalCount=1;
        this.PageIndex=1;
        this.PageSize=25; 
         
        this.pagProps=[];
        this.Obj=[];

        this.Page=1; 
        this.SizePage = 10;  
       // this.render();    
    }
   
    totalNumeroPaginasBotones(){
       return Math.ceil(this.TotalCount / this.SizePage);
    }  
    
    templatePag(){ 
        return new Promise((resolve, reject)=>{
            try { 

                for (let index = 1; index <= this.TotalCount; index++) {
                    this.Obj.push(index)
                }
                console.log(this.obj)
                let btn = "";
                for (let i = (this.Page - 1) * this.SizePage; i < (this.Page * this.SizePage); i++) {
                    btn += `<li class="page-item item-${this.Id}" >
                        <a href="#" class="page-link btnNums${this.Id}" id="i${this.Obj[i]}" data-value="${this.Obj[i]}" >${this.Obj[i]}</a>
                    </li>`
                } 

                let htmlPag=` 
                <div class="indicadores d-block" style="margin-top: 20">
                    Pagina: <span id="page${this.Id}"></span> 
                    N° <span id="nroPage${this.Id}"></span>
                </div>
                <div class="d-flex justify-content-center"> 
                    <nav aria-label="..." style="height: 20px;">
                        <ul class="pagination justify-content-center" style="display: flex; justify-content: center; flex-wrap: wrap " id="listPaginacion${this.Id}"> 
                            <li class="page-item">
                                <a class="page-link" href="#"  id="btnPrim${this.Id}">Primero</a>
                            </li>
                            <li class="page-item ">
                                <a class="page-link" href="#"  id="btnAnt${this.Id}">Anterior</a>
                            </li> 
                             ${btn} 
                            <li class="page-item">
                                <a class="page-link" href="#" id="btnSig${this.Id}">Siguiente</a>
                            </li>
                            <li class="page-item ">
                                <a class="page-link" href="#"  id="btnUlt${this.Id}">Ultimo</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                </br>
                `;
                resolve(htmlPag);
            } catch (error) {
                reject(error)
            }  
        })
    }

    render(){ 
        this.templatePag().then((response)=>{
            this.pagProps.ContentPag=document.getElementById(`pag${this.Id}`);
            this.pagProps.ContentPag.innerHTML=response;  
        }).catch((error)=>{
            console.error(error)
        }).finally(()=>{
            this.configPag();   
            this.actualizarValores()
        })
    }
    
    configPag(){
        //props 
        this.pagProps.btnPrim=document.getElementById(`btnPrim${this.Id}`);
        this.pagProps.btnUlt=document.getElementById(`btnUlt${this.Id}`); 
        this.pagProps.btnAnt=document.getElementById(`btnAnt${this.Id}`);  
        this.pagProps.btnSig=document.getElementById(`btnSig${this.Id}`);  
        this.pagProps.page=document.getElementById(`page${this.Id}`);
        this.pagProps.nroPage=document.getElementById(`nroPage${this.Id}`); 
        this.pagProps.btnNums=document.getElementsByClassName(`btnNums${this.Id}`); 
         
        //eventos  
        this.pagProps.btnAnt.addEventListener("click", (e)=> this.anterior(e)) 
        this.pagProps.btnSig.addEventListener("click", (e)=> this.siguiente(e)) 
        this.pagProps.btnPrim.addEventListener("click", (e)=> this.primero(e))
        this.pagProps.btnUlt.addEventListener("click", (e)=> this.ultimo(e)) 
        Array.from(this.pagProps.btnNums).map(e=>{
            return e.addEventListener("click", (e)=>  this.active(e))
        })
        
    }

    limpiarActive(){
        this.pagProps.btnNumsActives=document.querySelectorAll(`#listPaginacion${this.Id} .active`); 
        if (this.pagProps.btnNumsActives.length>0) 
            Array.from(this.pagProps.btnNumsActives).map(e=>{
                e.classList.remove("active")
            })
    }

    actualizarValores(){
        this.limpiarActive();    
        let btn=document.querySelector(`#listPaginacion${this.Id} #i${this.PageIndex}`) 
        btn.parentNode.classList.add("active");
        this.pagProps.page.innerText=this.Page; 
        this.pagProps.nroPage.innerText=this.PageIndex;
    }

    active(e){
        this.limpiarActive();
        this.PageIndex = parseInt(e.target.getAttribute('data-value'))  
        e.target.parentElement.classList.add("active");
        this.pagProps.nroPage.innerText=this.PageIndex;
    }

     getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //funciones de botones estaticos
    paginaAnterior(){
        if(this.Page>1) 
            this.Page--
        else    
            this.Page=1
    }
    
    paginaSiguiente(){
        if(this.Page<this.totalNumeroPaginasBotones()) 
            this.Page++
        else    
            this.Page=this.totalNumeroPaginasBotones()
    }
 
    anterior(e){ 
        e.stopImmediatePropagation();
        if(this.PageIndex<=1)  
            this.PageIndex=1;
        else    
            this.PageIndex--;

        let btn=document.querySelector(`#listPaginacion${this.Id} #i${this.PageIndex}`) 
        if (btn==null){
            this.Page--;
            this.render();
        }
        else{
            this.actualizarValores(); 
        }  
    }

    siguiente(e){
        e.stopImmediatePropagation();
        if(this.PageIndex>=this.TotalCount)
            this.PageIndex= this.TotalCount;
        else    
            this.PageIndex++; 
 
        let btn=document.querySelector(`#listPaginacion${this.Id} #i${this.PageIndex}`) 
        if (btn==null){
            this.Page++;
            this.render();
        }
        else{
            this.actualizarValores(); 
        } 
            
    }

    primero(e){
        e.stopImmediatePropagation();
        this.PageIndex=1; 
        let btn=document.querySelector(`#listPaginacion${this.Id} #i${this.PageIndex}`) 
        if (btn==null){
            this.Page=1;
            this.render();
        }
        else{
            this.actualizarValores(); 
        } 

    }

    ultimo(e){ 
        e.stopImmediatePropagation();
        this.PageIndex= this.TotalCount; 


        let btn=document.querySelector(`#listPaginacion${this.Id} #i${this.PageIndex}`) 
        if (btn==null){
            this.Page=this.totalNumeroPaginasBotones();
            this.render();
        }
        else{
            this.actualizarValores(); 
        } 
    } 
}

class ListaClientes extends Paginacion{
    constructor(){
        super("Clientes"); 
        this.props=[]; 
        this.config();  
    }

    config(){  
        this.props.btnbuscarcli=document.getElementById("btnbuscarcli"); 
    }
     
    Listas(){ 
        this.TotalCount=this.getRandom(10,1000);
        this.render()
    } 
} 
 
class ListaEmpleados extends Paginacion{
    constructor(){
        super("Empleados"); 
        this.props=[];
        this.config();    
    }

    config(){   
        this.props.btnbuscaremp=document.getElementById("btnbuscaremp");
    }
     
    Listas(){
        this.TotalCount= this.getRandom(10,1000);
        this.render()
    } 
}

window.addEventListener("load",function(e){
    let objClie=new ListaClientes();
     objClie.Listas();

    let objEmpl=new ListaEmpleados();
     objEmpl.Listas();

    objClie.props.btnbuscarcli.addEventListener("click",()=>objClie.Listas());
    objEmpl.props.btnbuscaremp.addEventListener("click",()=>objEmpl.Listas());
})

 