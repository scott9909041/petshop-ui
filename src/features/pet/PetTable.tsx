import { Table, Link as StyledLink, Box } from '@mui/joy';
import { Pet } from './pet.interface';
import { Link } from 'react-router-dom';

interface PetTableProps {
  pets: Pet[];
}

export default function PetTable({ pets }: PetTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Color</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {pets.map((pet) => (
          <tr key={pet.name}>
            <td>{pet.name}</td>
            <td>{pet.type}</td>
            <td>{pet.color}</td>
            <td>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Link
                  to={{
                    pathname: `/pet/${pet.id}/edit`,
                  }}
                >
                  <StyledLink
                    component='button'
                    variant='soft'
                    color='success'
                  >
                    Edit
                  </StyledLink>
                </Link>
                <Link
                  to={{
                    pathname: `/pet/${pet.id}/view`,
                  }}
                >
                  <StyledLink
                    component='button'
                    variant='soft'
                    color='neutral'
                  >
                    Detail
                  </StyledLink>
                </Link>
              </Box>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
