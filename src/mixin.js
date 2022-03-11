export default {
    methods: {
        formatName(name) {
            return name.replace(/^([^,]*),\s*(.*)$/, '$2 $1');
        },
    }
}
