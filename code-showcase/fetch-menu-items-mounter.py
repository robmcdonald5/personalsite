useEffect(() => {
    const fetchMenuItems = async () => {
        try {
            const response = await axios.get(`${baseURL}/get_menu_items`);
            setMenuItems(response.data.menu_items);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };
    fetchMenuItems();
}, []);
