package ibrahim.backend.service;

import ibrahim.backend.dto.StockMovementRequest;
import ibrahim.backend.dto.StockMovementResponse;
import ibrahim.backend.enums.MovementType;

import java.util.List;

public interface StockMovementService {

    List<StockMovementResponse> getAllMovements();

    StockMovementResponse getMovementById(Long id);

    StockMovementResponse recordMovement(StockMovementRequest request);

    List<StockMovementResponse> getMovementsByProduct(Long productId);

    List<StockMovementResponse> getMovementsByWarehouse(Long warehouseId);

    List<StockMovementResponse> getMovementsByType(MovementType type);
}
