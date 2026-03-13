package ibrahim.backend.dto;

import ibrahim.backend.enums.MovementType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StockMovementResponse {

    private Long id;
    private Long productId;
    private String productName;
    private Long warehouseId;
    private String warehouseName;
    private MovementType movementType;
    private Integer quantity;
    private String reference;
    private LocalDateTime createdAt;
}
