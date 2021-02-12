function openSidepanel()
{
    var sidepanel = document.getElementById('side-panel');
    if (sidepanel.classList.contains('panel-open'))
    {
        sidepanel.classList.add('panel-close');
        sidepanel.classList.remove('panel-open');
    }
    else
    {
        sidepanel.classList.add('panel-open');
        sidepanel.classList.remove('panel-close');
    }
}