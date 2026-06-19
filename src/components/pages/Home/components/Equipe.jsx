import membro1 from '../../../../assets/images/membro1.jpeg';
import membro2 from '../../../../assets/images/membro2.jpeg';
import membro3 from '../../../../assets/images/membro3.jpeg';
import membro4 from '../../../../assets/images/membro4.jpeg';
import membro5 from '../../../../assets/images/membro5.jpeg'; // A imagem da Michele

// Array de dados: Clean Code em ação!
const teamMembers = [
  { id: 1, name: 'David Santos', photo: membro1 },
  { id: 2, name: 'Fernando Camargo', photo: membro2 },
  { id: 3, name: 'Letícia Almeida', photo: membro3 },
  { id: 4, name: 'Lucas Sanchez', photo: membro4 },
  { id: 5, name: 'Michele Oliveira', photo: membro5 },
];

export function Equipe() {
  return (
    <section id="equipe" className="team-section">
      <div className="container">
        <h2>Responsáveis pelo Projeto</h2>
        <p className="section-subtitle">Conheça a equipe dedicada por trás desta iniciativa</p>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div className="team-member" key={member.id}>
              <div className="member-photo">
                <img 
                  src={member.photo} 
                  alt={`Foto do Responsável (${member.name})`} 
                  onError={(e) => {
                    // Fallback inteligente caso a imagem falhe
                    e.target.src = `https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=1A9328&color=fff&size=150`;
                  }}
                />
              </div>
              <h3>{member.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}