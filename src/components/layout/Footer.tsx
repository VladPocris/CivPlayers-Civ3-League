import { Mail, Youtube, Users, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-[var(--civ3-border)] mt-20" style={{ fontFamily: 'var(--civ3-font)', color: 'var(--civ3-gold)' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Contact</h3>
            <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-4 h-4" />
              <a href="mailto:suedeciviii@gmail.com" className="hover:underline">
                suedeciviii@gmail.com
              </a>
            </div>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Community</h3>
            <div className="space-y-3">
              <a 
                href="https://steamcommunity.com/groups/CivPlayersCiv3" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Users className="w-4 h-4" />
                <span>Steam Group</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="https://discord.gg/teVt5pt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="w-4 h-4 text-center font-bold text-xs">D</span>
                <span>Discord Server</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="https://www.youtube.com/channel/UCvJNJ8HF5BWrErL-RpvqbYQ/featured" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Youtube className="w-4 h-4" />
                <span>YouTube Channel</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Credits */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">About</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The premier Civilization III multiplayer league. 
              Bringing together players from around the world for competitive gameplay since 2020.
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              Built with modern web technologies
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CivPlayers Civ3 League. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;