package ibrahim.backend.repository;

import ibrahim.backend.entity.StockMovement;
import ibrahim.backend.enums.MovementType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockMovementRepository extends JpaRepository<StockMovement, Long> {

    List<StockMovement> findByProductId(Long productId);

    List<StockMovement> findByWarehouseId(Long warehouseId);

    List<StockMovement> findByMovementType(MovementType movementType);

    List<StockMovement> findByProductIdAndWarehouseId(Long productId, Long warehouseId);
}
