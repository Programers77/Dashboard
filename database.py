from dotenv import load_dotenv
import os
import pyodbc
from datetime import datetime

# Cargar variables de entorno
load_dotenv()

# def get_db_connection():
#     """Crear conexión a la base de datos"""
#     conn_str = (
#         "DRIVER={SQL Server};"
#         "SERVER=ELTIO-CENTRAL;"
#         "DATABASE=VAD10_FUNDI;"
#         "UID=sa;"
#         "PASSWORD=;"
#         "Trusted_Connection=no;"
#     )
    
#     return pyodbc.connect(conn_str)

def get_dashboard_data():
    """Obtener datos de ventas de la base de datos"""
    try:
        # conn = get_db_connection()
        # cursor = conn.cursor()
        
        # # Consulta para obtener Total_USD
        # cursor.execute("SELECT n_TOTAL FROM dbo.TR_INVENTARIO")
        # total_usd_row = cursor.fetchone()
        # total_usd = float(total_usd_row[0]) if total_usd_row else 0
        
        # # Consulta para obtener n_Total (ventas en Bs)
        # cursor.execute("SELECT n_TOTAL FROM dbo.TR_INVENTARIO")
        # total_bs_row = cursor.fetchone()
        # total_bs = float(total_bs_row[0]) if total_bs_row else 0
        total_bs = 500000000
        total_usd = 3000000
        return {
            "dollarBCV": 30.50,  # Valor estático por ahora
            "dollarParalelo": 32.00,  # Valor estático por ahora
            "totalSalesUSD": total_usd,
            "totalSalesBS": total_bs,
            "totalSalesCashea": total_usd * 0.5,  # Ejemplo
            "storesSales": [
                {"name": "Kapitana", "sales": total_usd * 0.3, "color": "#FF6B6B"},
                {"name": "Valencia", "sales": total_usd * 0.25, "color": "#4ECDC4"},
                {"name": "Guacara", "sales": total_usd * 0.2, "color": "#45B7D1"},
                {"name": "Cagua", "sales": total_usd * 0.15, "color": "#96CEB4"},
                {"name": "Cruz Verde", "sales": total_usd * 0.1, "color": "#FFEEAD"},
                {"name": "Cabimas", "sales": total_usd * 0.3, "color": "#FF6B6B"},
                {"name": "Babilon", "sales": total_usd * 0.25, "color": "#4ECDC4"},
                {"name": "Guanare", "sales": total_usd * 0.2, "color": "#45B7D1"},
                {"name": "Cabudare", "sales": total_usd * 0.15, "color": "#96CEB4"},
                {"name": "Valera", "sales": total_usd * 0.1, "color": "#FFEEAD"},{"name": "Caracas Centro", "sales": total_usd * 0.3, "color": "#FF6B6B"},
                {"name": "Catia", "sales": total_usd * 0.25, "color": "#4ECDC4"},
                {"name": "Propatria", "sales": total_usd * 0.2, "color": "#45B7D1"},
                {"name": "Baralt", "sales": total_usd * 0.15, "color": "#96CEB4"},
                {"name": "Maturin", "sales": total_usd * 0.1, "color": "#FFEEAD"},
                {"name": "Upata", "sales": total_usd * 0.1, "color": "#FFEEAD"}

            ],
            "salesByCategory": [
                {"category": "Electrónica", "sales": total_usd * 0.3, "color": "#FF6B6B"},
                {"category": "Ropa", "sales": total_usd * 0.25, "color": "#4ECDC4"},
                {"category": "Alimentos", "sales": total_usd * 0.2, "color": "#45B7D1"},
                {"category": "Hogar", "sales": total_usd * 0.15, "color": "#96CEB4"},
                {"category": "Juguetes", "sales": total_usd * 0.1, "color": "#FFEEAD"}
            ]
        }
    except Exception as e:
        print(f"Error al obtener datos: {str(e)}")
        return None
    # finally:
    #     try:
    #         conn.close()
    #     except:
    #         pass