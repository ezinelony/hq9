let callback = (obj, args) => {
    args =  (args || []) instanceof Array ? args : [args];
    if( typeof obj === "function"){
        return obj.apply(null, args);
    } else if(typeof obj === "object" && typeof obj.context === "object" && typeof obj.func === "function"){
        return obj.func.apply(obj.context, args);
    }
};

export default  callback;