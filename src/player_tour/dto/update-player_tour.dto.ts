import { PartialType } from '@nestjs/swagger';
import { CreatePlayerTourDto } from './create-player_tour.dto';

export class UpdatePlayerTourDto extends PartialType(CreatePlayerTourDto) {}
