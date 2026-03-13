package ibrahim.backend.mapper;

import ibrahim.backend.dto.StockMovementResponse;
import ibrahim.backend.entity.StockMovement;
import org.springframework.stereotype.Component;

@Component
public class StockMovementMapper {

    public StockMovementResponse toResponse(StockMovement movement) {
        return StockMovementResponse.builder()
                .id(movement.getId())
                .productId(movement.getProduct().getId())
                .productName(movement.getProduct().getName())
                .warehouseId(movement.getWarehouse().getId())
                .warehouseName(movement.getWarehouse().getName())
                .movementType(movement.getMovementType())
                .quantity(movement.getQuantity())
                .reference(movement.getReference())
                .createdAt(movement.getCreatedAt())
                .build();
    }
}
