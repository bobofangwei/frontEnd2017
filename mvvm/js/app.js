var model = {
    el: '#app',
    data: {
        name: 'bobo',
        age: '28',
        hobby: {
            sport: 'swim'
        },
        isActive:'active',
    },
    methods: {
        dosomething: function() {
            console.log('dosomething', arguments);
        }
    },
};

var vm = Object.create(MVVM);
vm.init(model);