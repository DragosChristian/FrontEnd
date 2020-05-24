function save() {
    localStorage.setItem('pepperoni-pizza', true);
}

window.onload=function(){
    var favorite=document.getElementById('favorite');
    if (window.localStorage)
{
    var storage=window.localStorage;
    if (storage.getItem('pepperoni-pizza')=='true')
        {
            favorite.innerHTML="Pizza cu pepperoni a fost deja adăugată în favoritele tale."
        }

    }

}