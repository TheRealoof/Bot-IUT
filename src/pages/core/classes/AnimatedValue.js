class AnimatedValue
{
    constructor(value)
    {
        this.value = value;
        this.targetValue = 100;
        this.speed = 200;
        this.currentTime = Date.now();
        this.onNewFrame = undefined;
        this.running = true;
    }

    update(value)
    {
        this.targetValue = value;
    }

    start()
    {
        this.running = true;
        requestAnimationFrame(()=> {this.newFrame(this)});
    }

    stop()
    {
        this.running = false;
    }

    newFrame(object)
    {
        if (!this.running)
            return;
        
        
        const frameTime = (Date.now() - object.currentTime)/1000;
        object.currentTime = Date.now();
        const addValue = frameTime*object.speed;
        if (Math.abs(object.value - object.targetValue) > addValue)
            object.value = object.value + ( (object.value < object.targetValue) ? (addValue) : (-addValue) );
        else
            object.value = object.targetValue;
        if (this.onNewFrame)
        {
            try {this.onNewFrame()} 
            catch (e) {}
        }
        requestAnimationFrame(() => {object.newFrame(object)})
    }
}

module.exports = AnimatedValue;