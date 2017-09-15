using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Game_App.Startup))]
namespace Game_App
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
