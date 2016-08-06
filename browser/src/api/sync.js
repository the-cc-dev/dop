

dop.api.prototype.sync = function(object_name, object) {

    var promise = new dop.util.promise();
        object_name = object_name.trim();

    // Must be an object
    if ( !object || typeof object != 'object' )
        throw new TypeError( dop.error.SYNC_MUST_BE_OBJECT );

    if ( object && typeof object == 'object' && dop.util.typeof( object[dop.key_object_path] ) == 'array' )
        throw new TypeError( dop.error.SYNC_NO_REPEAT );

    // If the object object_name does not exists yet we have to wait until the server send the object
    if ( typeof this.objects_name[ object_name ] == 'undefined' )
        this.objects_name[ object_name ] = {object:object, promise:promise};

    // If we already have the object remote
    else if ( typeof this.objects_name[ object_name ].request == 'object' && typeof this.objects_name[ object_name ].object == 'undefined' ) {
        this.objects_name[ object_name ].promise = promise;
        dop.on.sync.resolve.call( this, this.objects_name[ object_name ].request, object);
    }

    else
        throw new TypeError( dop.error.SYNC_NO_REPEAT_NAME );

    return this.objects_name[ object_name ].promise;

};











